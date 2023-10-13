import { useState, useEffect } from 'react'
import { CommonDataSvcClient } from 'src/layout/protos-gen/CommonData_grpc_web_pb'
import { EmptyCommonDataMessage } from 'src/layout/protos-gen/CommonData_pb'

const useCountries = (url) => {
  const client = new CommonDataSvcClient(url, null, null)
  const [countryOption, setCountryOption] = useState([])

  useEffect(() => {
    const request = new EmptyCommonDataMessage()

    client.getReceivingOperatingCountries(request, null, (err, response) => {
      if (err) {
        console.log(err.message)
        return
      }
      //Country Array
      const countryArray = [
        {
          label: 'Select country',
          value: '',
          flag: '',
        },
      ]
      //Construct the country object
      const countrylistArray = response.toObject()
      //Creating the country options
      for (const countryObj of countrylistArray.countrylistList) {
        countryArray.push({
          label: countryObj.countryname,
          value: countryObj.countrycode,
          flag: countryObj.countryflagurl,
        })
      }
      //Setting countries to state
      setCountryOption(countryArray)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return [countryOption]
}

export default useCountries
