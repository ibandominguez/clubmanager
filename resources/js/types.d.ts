export interface User {
  id: number
  name: string
  email: string
  created_at: string
  updated_at: string
}

export interface Member {
  id: number
  uid: string
  name: string
  photo_url: string
  dob: string
  dni_nie: string
  address: string
  phone: string
  email: string
  registered_at: string
  is_retired: string
  created_at: string
  updated_at: string
}
