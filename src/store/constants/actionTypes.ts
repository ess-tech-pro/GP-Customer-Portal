export const ActionTypes = {
  PRODUCTS: {
    FETCH_PRODUCTS: 'products/fetchProducts',
    POST_CART: 'products/postCart',
  },
  USERS: {
    FETCH_USERS: 'users/fetchUsers',
    CREATE_USER: 'users/createUser',
  },
  AUTH: {
    LOGIN: 'auth/login',
  },
  GAME: {
    GAME_DETAIL: 'game/gameDetail',
    GAME_LIST: 'game/gameList',

  },
  OPTIONS: {
    REGISTER_GAME: 'options/getOptionsRegisterGame'
  },
  ORGANIZATIONS: {
    ORGANIZATION_LIST: 'organizations/organizationList',
    CREATE_ORGANIZATION: 'organizations/createOrganization',
    DELETE_ORGANIZATION: 'organizations/deleteOrganization',
  },
  // Thêm các module khác nếu cần
}
