import { useTranslation } from 'react-i18next'
import './Home.css'
import Logo from '~/containers/logo/Logo'
import { useEffect, useState } from 'react'
import { exampleService } from '~/services/example-service'
import useAxios from '~/hooks/use-axios'
import { Button } from '@mui/material'

const Home = () => {
  const [exampleItems, setExampleItems] = useState([])
  const { t } = useTranslation()
  const { response, loading, fetchData } = useAxios({ service: exampleService.getAll })

  useEffect(() => {
    if (response) {
      setExampleItems(response.data.items)
    }
  }, [response])

  return (
    <div className='Home'>
      <Logo />
      <Button onClick={ fetchData }>Test</Button>
      { t('common.title') }
      { loading ? <div>Loading</div> : exampleItems.map((example) => (<div key={ example._id }>
        { example.title }
      </div>)) }
    </div>
  )
}

export default Home
