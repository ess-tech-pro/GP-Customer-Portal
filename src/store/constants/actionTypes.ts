export const ActionTypes = {
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
    REGISTER_GAME: 'game/register'
  },
  OPTIONS: {
    REGISTER_GAME: 'options/getOptionsRegisterGame'
  },
  ORGANIZATIONS: {
    ORGANIZATION_LIST: 'organizations/organizationList',
    CREATE_ORGANIZATION: 'organizations/createOrganization',
    DELETE_ORGANIZATION: 'organizations/deleteOrganization',
  },
  REGISTER_GAME: 'game/register'
}
