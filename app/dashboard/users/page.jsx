import React from 'react'
import UsersList from '../components/Lists/UsersList'
import LeadsList from '../components/Lists/LeadsList'

export default function page() {
  return (
    <section>
      <h1>المستخدمين</h1>
      <UsersList />
      <h1>العملاء</h1>
      <LeadsList />
    </section>
  )
}
