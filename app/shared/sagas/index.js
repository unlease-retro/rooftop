import * as auth from '../../auth'
import * as ui from '../../ui'

export default function* rootSaga() {

  yield [
    auth.saga(),
    ui.saga(),
  ]

}
