import { LayersModel, loadLayersModel, tensor2d } from '@tensorflow/tfjs'
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { Container, Box, Button, Heading, Input, Text } from 'theme-ui'
import { ToxicityClassifier, load as loadToxicity } from '@tensorflow-models/toxicity'
import { Loading, Error } from '../components'

const MODEL_URL = 'https://storage.googleapis.com/tfjs-models/tfjs/sentiment_cnn_v1/model.json'
const METADATA_URL =
  'https://storage.googleapis.com/tfjs-models/tfjs/sentiment_cnn_v1/metadata.json'

const SentimentAnalysis = () => {
  const [model, setModel] = useState<LayersModel>()
  const [modelToxicity, setModelToxicity] = useState<ToxicityClassifier>()
  const [metadata, setMetadata] = useState<any>()
  const [loading, setLoading] = useState<boolean>(false)
  const [loadingScore, setLoadingScore] = useState<boolean>(false)
  const [score, setScore] = useState<number>()
  const [scoreToxicity, setScoreToxicity] = useState<any[]>()
  const [state, setState] = useState<string>(
    'This is really the most useless talk I have ever watched'
  )
  const [error, setError] = useState<boolean>(false)

  const loadModel = async () => {
    try {
      setLoading(true)
      setModelToxicity(await loadToxicity(0.9, []))
      setModel(await loadLayersModel(MODEL_URL))
      setMetadata(await (await fetch(METADATA_URL)).json())
      setLoading(false)
    } catch (e) {
      setError(true)
    }
  }

  const onChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setState(evt.currentTarget.value)
  }

  const onAnalyse = async (e: FormEvent | MouseEvent) => {
    e.preventDefault()
    if (!metadata || !model) return

    setLoadingScore(true)
    setScore(undefined)
    setScoreToxicity(undefined)

    const trimmed = state
      .trim()
      .toLowerCase()
      .replace(/(\.|,|!\?)/g, '')
      .split(' ')

    const sequence = trimmed.map(word => {
      const wordIndex = metadata.word_index[word]
      if (typeof wordIndex === 'undefined') {
        return 2
      }
      return wordIndex + metadata.index_from
    })

    const finalSequence = new Array(metadata.max_len - sequence.length).fill(0).concat(sequence)

    const inputTensor = tensor2d(finalSequence, [1, metadata.max_len])
    const prediction = model.predict(inputTensor)
    //@ts-ignore
    setScore(prediction.dataSync()[0])
    //@ts-ignore
    prediction.dispose()

    setScoreToxicity(await modelToxicity?.classify([state]))
    setLoadingScore(false)
  }

  useEffect(() => {
    loadModel()
  }, [])

  return (
    <Container as="section" variant="layout.section">
      <Heading as="h2">Sentiment analysis</Heading>
      <Heading as="h4" variant="styles.h4">
        Analyse text sentiment and toxicity.
      </Heading>
      {error ? (
        <Error />
      ) : (
        <>
          {loading && <Loading text="Loading Sentiment and Toxicity models" />}
          {!loading && (
            <>
              <Box as="form" sx={{ position: 'relative' }} onSubmit={onAnalyse}>
                <Input
                  maxLength={100}
                  autoComplete="off"
                  mt={3}
                  onChange={onChange}
                  value={state}
                  name="input"
                />
                <Box sx={{ position: 'absolute', bottom: -25, right: '2px', fontSize: 0 }}>
                  {state.length}/100
                </Box>
              </Box>
              {score && scoreToxicity && (
                <Box mt={2}>
                  <Text>
                    <Heading mt={4} as="h3">
                      Sentiment Score:
                    </Heading>
                    <Text
                      as="span"
                      mt={3}
                      sx={{
                        color: score > 0.66 ? 'green' : score < 0.33 ? 'red' : 'orange',
                      }}
                    >
                      {score}
                    </Text>
                  </Text>
                  <Text mt={2}>
                    <Heading mt={4} as="h3">
                      Toxicity:
                    </Heading>
                    {scoreToxicity?.map((s: any, index: number) => (
                      <Box
                        mt={2}
                        pl={3}
                        key={index}
                        sx={{ opacity: s.results.every((a: any) => a.match) ? 1 : 0.4 }}
                      >
                        <b>{s.label}</b>:
                        {s.results.map((r: any, i: number) => (
                          <Box mt={2} key={i}>
                            <Text sx={{ pl: 4 }}>
                              Probabilities: {JSON.stringify(r.probabilities)}
                            </Text>
                            <Text sx={{ pl: 4 }}>
                              Match:{' '}
                              <Text
                                as="span"
                                sx={{
                                  color: r.match ? 'green' : 'text',
                                  fontWeight: r.match ? 'bold' : 'normal',
                                }}
                              >
                                {JSON.stringify(r.match)}
                              </Text>
                            </Text>
                          </Box>
                        ))}
                      </Box>
                    ))}
                  </Text>
                </Box>
              )}
              <Button
                sx={{
                  opacity: loadingScore ? 0.4 : 1,
                  pointerEvents: loadingScore ? 'none' : 'visible',
                }}
                mt={4}
                onClick={onAnalyse}
              >
                {!loadingScore ? 'Analyse' : 'Loading...'}
              </Button>
            </>
          )}
        </>
      )}
    </Container>
  )
}

export default SentimentAnalysis
