export interface ICategory {
  id: number
  icon: string
  label: string
  color: 'sweet' | 'orange' | 'amber' | 'emerald' | 'rose'
  selected: boolean
}