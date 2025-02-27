import { getPayload } from 'payload'
//import buildConfig from '../../../payload.config'
//import buildConfig from '@payload-config'
import configPromise from '@payload-config'
import Image from 'next/image'
import { Media } from '@/payload-types'

export default async function Eventos() {
  const payload = await getPayload({ config: configPromise })

  const eventos = await payload.find({
    collection: 'eventos',
    depth: 1,
    limit: 12,
    overrideAccess: false,
    select: {
      titulo: true,
      image: true,
      descricao: true,
      inicio: true,
      termino: true,
      slug: true,
      categories: true,
      meta: true,
    },
  })

  console.log('eventos', eventos)
  return (
    <ul>
      {eventos.docs.map((evento, id) => {
        console.log('image', evento.image)
        const imgUrl = (evento.image as Media).sizes?.thumbnail
        console.log('imgUrl', imgUrl)

        return (
          <li key={id} className="bg-black p-4 rounded-md">
            <h2>Título: {evento.titulo}</h2>
            <div>
              {imgUrl && <Image className="h-24 w-24" src={imgUrl.url!} alt="evento" height={40} width={40} />}
            </div>
          </li>
        )
      })}
    </ul>
  )
}
