// Override Imports
import autocomplete from './autocomplete'
import button from './button'
import card from './card'
import checkbox from './checkbox'
import formControlLabel from './form-control-label'
import iconButton from './icon-button'
import input from './input'
import pagination from './pagination'
import radio from './radio'
import select from './select'
import switchOverrides from './switch'
import typography from './typography'

const overrides = () => {
  return {
    ...autocomplete(),
    ...button,
    ...card(),
    ...checkbox,
    ...formControlLabel,
    ...iconButton,
    ...input,
    ...pagination,
    ...radio,
    ...select,
    ...switchOverrides,
    ...typography
  }
}

export default overrides
