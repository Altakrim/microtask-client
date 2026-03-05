const API_URL = import.meta.env.VITE_API_URL

export async function uploadImage(imageFile) {
  const reader = new FileReader()
  
  return new Promise((resolve, reject) => {
    reader.onload = async (e) => {
      try {
        const base64String = e.target.result.split(',')[1]
        
        const response = await fetch(`${API_URL}/upload/image`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify({
            image: base64String
          })
        })

        if (!response.ok) {
          throw new Error('Failed to upload image')
        }

        const data = await response.json()
        resolve(data.image.url)
      } catch (error) {
        reject(new Error(error.message || 'Image upload failed'))
      }
    }

    reader.onerror = () => {
      reject(new Error('Failed to read file'))
    }

    reader.readAsDataURL(imageFile)
  })
}
