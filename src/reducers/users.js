const initialState = {
    users: [
      {
        id: 1,
        name: 'Valientin',
        lastname: 'Kurzhiy'
      }
    ],
    auth: {
      authenticated: true,
      userId: 1
    }
  }
  
  export function users(state = initialState, action) {
    switch (action.type) {
      default:
        return state
    }
  }