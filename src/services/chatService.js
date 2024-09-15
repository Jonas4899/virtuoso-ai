const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

export const createChat = async (data) => {
  try {
    const respuesta = await fetch(`${API_URL}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    if (respuesta.ok) {
      const objetoRespuesta = await respuesta.json()
      return objetoRespuesta
    } else {
      throw new Error(`Error al crear el recurso: ${respuesta.statusText}`)
    }
  } catch (err) {
    console.log(err)
    throw err
  }
}

export const getChat = async (chatId) => {
  try {
    const respuesta = await fetch(`${API_URL}/chat/${chatId}`)

    if (respuesta.ok) {
      const objetoRespuesta = await respuesta.json()
      return objetoRespuesta
    } else {
      throw new Error(
        `Error al obtener información del recurso: ${respuesta.statusText}`
      )
    }
  } catch (err) {
    console.log(err)
    throw err
  }
}

export const updateChat = async (chatId, messages) => {
  try {
    const respuesta = await fetch(`${API_URL}/chat/${chatId}/messages`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        messages: messages
      })
    })

    if (respuesta.ok) {
      const objetoRespuesta = await respuesta.json()
      return objetoRespuesta
    } else {
      throw new Error(`Error al actualizar el recurso: ${respuesta.statusText}`)
    }
  } catch (err) {
    console.log(err)
    throw err
  }
}

export const deleteChat = async (chatId) => {
  try {
    const respuesta = await fetch(`${API_URL}/chat/${chatId}`, {
      method: 'DELETE'
    })

    if (respuesta.ok) {
      return true
    } else {
      throw new Error(`Error al eliminar el chat: ${respuesta.statusText}`)
    }
  } catch (err) {
    console.log(err)
    throw err
  }
}

