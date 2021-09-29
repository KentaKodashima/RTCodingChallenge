require('dotenv').config()
const express = require('express')
const axios = require('axios')
const http = require('http')

const BASE_URL = process.env.BASE_URL

const app = express()

app.use(express.json({ type: '*/*' }))

app.get('/', (req, res) => {
  res.sendStatus(200)
})

app.post('/webhook', async (req, res) => {
  try {
    const userRegistrationData = {
      name: 'Kenta Kodashima',
      email: 'kentakodashima@gmail.com',
    }
    const headers = {
      'Content-Type': 'application/json',
      Authorization: 'JWT fefege...',
    }

    // Get user_id
    const { data: { user_id } } = await axios.post(
      `${BASE_URL}/challenge-register`,
      userRegistrationData,
      { headers }
    )

    // Get conversation id
    const { data: { conversation_id } } = await axios.post(
      `${BASE_URL}/challenge-conversation`,
      { user_id },
      { headers }
    )

    /**
     * A helper function to retrieve messages from the chatbot.
     * @returns { Object } - The messages returned from the chatbot.
     */
    const retrieve = async () => {
      const { data: { messages } } = await axios.get(
        `${BASE_URL}/challenge-behaviour/${conversation_id}`,
        null,
        { headers }
      )
      return messages
    }

    /**
     * A helper function to reply to the chatbot.
     * @param { Object } content - The content to reply.
     * @returns { boolean } - The boolean value returned from the chatbot.
     */
    const reply = async (content) => {
      const { data: { correct } } = await axios.post(
        `${BASE_URL}/challenge-behaviour/${conversation_id}`,
        content,
        { headers }
      )
      return correct
    }

    // Retrieve 1st messages
    await retrieve()
    const firstContent = {
      content: 'yes',
    }
    // Reply to the chatbot
    await reply(firstContent)

    // Retrieve 2nd messages
    await retrieve()
    const secondContent = {
      content: '19',
    }
    // Reply to the chatbot
    await reply(secondContent)

    // Retrieve 3rd messages
    await retrieve()
    const thirdContent = {
      content: '84',
    }
    // Reply to the chatbot
    await reply(thirdContent)

    // Retrieve 4th messages
    await retrieve()
    const forthContent = {
      content: '84',
    }
    // Reply to the chatbot
    await reply(forthContent)

    // Retrieve 5th messages
    await retrieve()
    const fifthContent = {
      content: 'yes',
    }
    // Reply to the chatbot
    await reply(fifthContent)

    // Retrieve 6th messages
    await retrieve()
    const sixthContent = {
      content: 'potato,to,five,javascript,week',
    }
    // Reply to the chatbot
    await reply(sixthContent)
    
    // Retrieve 7th messages
    await retrieve()
    const seventhMessages = await retrieve()
    const seventhStrArr = seventhMessages[0].text.split(':')[1].split(',')
    const sortedSeventh = seventhStrArr.sort()
    const joinedSeventh = sortedSeventh.join()
    const trimmedSeventh = joinedSeventh.replace(/[. ]/g,'')

    const seventhContent = {
      content: trimmedSeventh
    }
    // Reply to the chatbot
    await reply(seventhContent)

    // Retrieve 8th messages
    await retrieve()
    const eighthMessages = await retrieve()
    const eighthStrArr = eighthMessages[0].text.split(':')[1].split(',')
    const sortedEighth = eighthStrArr.sort((a, b) => {
      return a.replace(/[. ]/g,'').toLowerCase().localeCompare(b.replace(/[. ]/g,'').toLowerCase())
    })
    const joinedEighth = sortedEighth.join()
    const trimmedEighth = joinedEighth.replace(/[. ]/g,'')

    const eighthContent = {
      content: trimmedEighth
    }
    // Reply to the chatbot
    await reply(eighthContent)

    // Retrieve 9th messages
    await retrieve()
    const ninethContent = {
      content: 'yes',
    }
    // Reply to the chatbot
    await reply(ninethContent)

    // Question goes on...

    res.status(200).send()
  } catch (e) {
    console.log(e, 'error')
    res.status(500).send()
  }
})

const PORT = process.env.PORT || 3000

const server = http.createServer(app)
server.listen(PORT, () => console.log('Server listening on: ', PORT))