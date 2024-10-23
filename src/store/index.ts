import { create, StateCreator } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

export interface UserStore {
  user: string
  setUser: (newUser: string) => void
}

export interface PasswordsList {
  passwordsList: Array<{ id: string; value: string }>
  addPassword: (password: string) => void
}

const createUserSlice: StateCreator<
  UserStore & PasswordsList,
  [],
  [],
  UserStore
> = (set) => ({
  user: "",
  setUser: (newUser: string) => set(() => ({ user: newUser })),
})

const createPasswordGenSlice: StateCreator<
  UserStore & PasswordsList,
  [],
  [],
  PasswordsList
> = (set) => ({
  passwordsList: [],
  addPassword: (password: string) =>
    set((state) => ({
      passwordsList: [
        { id: (Math.random() * 1000).toString(36), value: password },
        ...state.passwordsList,
      ],
    })),
})

const useStore = create<UserStore & PasswordsList>()(
  persist(
    (...action) => ({
      ...createUserSlice(...action),
      ...createPasswordGenSlice(...action),
    }),
    { name: "zustand-store", storage: createJSONStorage(() => localStorage) }
  )
)

export const userSelector = (state: UserStore) => state.user
export const setUserSelector = (state: UserStore) => state.setUser

export const passwordsListSelector = (state: PasswordsList) =>
  state.passwordsList
export const addPasswordListSelector = (state: PasswordsList) =>
  state.addPassword

export default useStore
