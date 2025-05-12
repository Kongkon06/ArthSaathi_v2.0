import React from 'react'
import BudgetList from '@/components/budget/components/BudgetList'

function Budget() {
  return (
    <div className='p-10 space-y-5'>
      <h2 className='font-bold text-3xl'>My Budgets</h2>
      <BudgetList/>
    </div>
  )
}

export default Budget