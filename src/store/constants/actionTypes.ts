export const ActionTypes = {
  APP_CONFIG: {
    GET_CONFIGS: 'app_config/getConfigs'
  },
  PRODUCTS: {
    FETCH_PRODUCTS: 'products/fetchProducts',
    POST_CART: 'products/postCart',
  },
  USERS: {
    LIST_USER: 'users/fetchListUser',
    CREATE_USER: 'users/createUser',
    UPDATE_USER: 'users/updateUser',
    INFOR_USER: 'users/me'
  },
  AUTH: {
    LOGIN: 'auth/login',
  },
  GAME: {
    GAME_DETAIL: 'game/gameDetail',
    GAME_LIST: 'game/gameList',
    REGISTER_GAME: 'game/register',
    REGISTER_GAME_LIST: 'game/registerGameList',
    REGISTER_GAME_DETAIL: 'game/registerGameDetail',
    UPDATE_REGISTER_GAME: 'game/updateRegisterGame',
  },
  OPTIONS: {
    REGISTER_GAME: 'options/getOptionsRegisterGame'
  },
  ORGANIZATIONS: {
    ORGANIZATION_LIST: 'organizations/organizationList',
    CREATE_ORGANIZATION: 'organizations/createOrganization',
    DELETE_ORGANIZATION: 'organizations/deleteOrganization',
    UPDATE_ORGANIZATION: 'organizations/updateOrganization'
  },
  REGISTER_GAME: 'game/register'
}
