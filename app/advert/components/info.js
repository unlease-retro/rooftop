import React from 'react'
import { Grid, View, Section } from 'components/layout'
import { Icon } from 'components/icon'

const Component = ({ advertById }) => {

  const { price, submited, submitedBy, phoneNumber, location: { postcode, area }, amenities: { balcony, garden, parking }, avability: { avability, minimumTerm, maximumTerm }, author: { name, type }, preferences: { couples, gender } } = advertById

  return (
    <Grid cell={6/0.12}>

      <Section border atomic={{ mt:1, mb:1, p:1 }}>

      <Text atomic={{ m:0, pb:2, fw:'b' }}>General</Text>

      <View atomic={{ p:0, mb:1, d:'f' }}>

        <Icon>done_all</Icon>

        <Text atomic={{ m:0, ml:1 }}>Status: { submited ? 'Submited' : 'Not sent' }</Text>

      </View>

      <View atomic={{ p:0, mb:1, d:'f' }}>

        <Icon>attach_money</Icon>

        <Text atomic={{ m:0, ml:1 }}>Price: £{ price }</Text>

      </View>

      { submited && <View atomic={{ p:0, m:0, d:'f' }}>

        <Icon>accessibility</Icon>

        <Text atomic={{ m:0, ml:1 }}>Submited by: { submitedBy }</Text>

      </View> }

      </Section>


      <Section border atomic={{ mt:1, mb:1, p:1 }}>

      <Text atomic={{ m:0, pb:2, fw:'b' }}>Host</Text>

      <View atomic={{ p:0, mb:1, d:'f' }}>

        <Icon>person</Icon>

        <Text atomic={{ m:0, ml:1 }}>Name: { name }</Text>

      </View>

      <View atomic={{ p:0, mb:1, d:'f' }}>

        <Icon>settings_phone</Icon>

        <Text atomic={{ m:0, ml:1 }}>Phone: { phoneNumber }</Text>

      </View>

      <View atomic={{ p:0, m:0, d:'f' }}>

        <Icon>account_balance_wallet</Icon>

        <Text atomic={{ m:0, ml:1 }}>Type: { type }</Text>

      </View>

      </Section>


      <Section border atomic={{ mt:1, mb:1, p:1 }}>

      <Text atomic={{ m:0, pb:2, fw:'b' }}>Location</Text>

      <View atomic={{ p:0, mb:1, d:'f' }}>

        <Icon>location_on</Icon>

        <Text atomic={{ m:0, ml:1 }}>Postcode: { postcode }</Text>

      </View>

      <View atomic={{ p:0, m:0, d:'f' }}>

        <Icon>location_city</Icon>

        <Text atomic={{ m:0, ml:1 }}>Area: { area }</Text>

      </View>

      </Section>


      <Section border atomic={{ mt:1, mb:1, p:1 }}>

      <Text atomic={{ m:0, pb:2, fw:'b' }}>Preferences</Text>

      <View atomic={{ p:0, mb:1, d:'f' }}>

        <Icon>person_add</Icon>

        <Text atomic={{ m:0, ml:1 }}>Couples: { couples }</Text>

      </View>

      <View atomic={{ p:0, m:0, d:'f' }}>

        <Icon>face</Icon>

        <Text atomic={{ m:0, ml:1 }}>Gender: { gender }</Text>

      </View>

      </Section>


      <Section border atomic={{ mt:1, mb:1, p:1 }}>

      <Text atomic={{ m:0, pb:2, fw:'b' }}>Avability</Text>

      <View atomic={{ p:0, mb:1, d:'f' }}>

        <Icon>access_time</Icon>

        <Text atomic={{ m:0, ml:1 }}>Avability: { avability }</Text>

      </View>

      <View atomic={{ p:0, mb:1, d:'f' }}>

        <Icon>timer</Icon>

        <Text atomic={{ m:0, ml:1 }}>Minimum term: { minimumTerm }</Text>

      </View>

      <View atomic={{ p:0, m:0, d:'f' }}>

        <Icon>timer_off</Icon>

        <Text atomic={{ m:0, ml:1 }}>Maximum term: { maximumTerm }</Text>

      </View>

      </Section>


      <Section border atomic={{ mt:1, mb:1, p:1 }}>

      <Text atomic={{ m:0, pb:2, fw:'b' }}>Amenities</Text>

      <View atomic={{ p:0, mb:1, d:'f' }}>

        <Icon>account_balance</Icon>

        <Text atomic={{ m:0, ml:1 }}>Balcony: { balcony }</Text>

      </View>

      <View atomic={{ p:0, mb:1, d:'f' }}>

        <Icon>local_florist</Icon>

        <Text atomic={{ m:0, ml:1 }}>Garden: { garden }</Text>

      </View>

      <View atomic={{ p:0, m:0, d:'f' }}>

        <Icon>local_parking</Icon>

        <Text atomic={{ m:0, ml:1 }}>Parking: { parking }</Text>

      </View>

      </Section>

    </Grid>
  )

}

export default Component
