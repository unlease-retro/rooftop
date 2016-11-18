import React from 'react'

import { Button } from 'components/button'
import { Textarea } from 'components/textarea'
import { Grid, View, Section } from 'components/layout'

const Component = ({ advertById: { replies }, renderReply }) => {

  return (
    <View atomic={{ p:0 }}>

      { replies.map(r => renderReply(r)) }

      <View atomic={{ p:0, mt:1 }}>

        <Textarea maxWidth='initial' atomic={{ p:1, mt:0, mb:1 }}></Textarea>

        <Grid>

          <Button backgroundColor='error' atomic={{ w:'a' }} color='white'>Send message</Button>

          <Button backgroundColor='accent' atomic={{ w:'a' }} color='white'>Generate message</Button>

        </Grid>

      </View>

    </View>
  )

}

export default Component