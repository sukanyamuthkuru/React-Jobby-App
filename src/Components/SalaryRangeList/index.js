import './index.css'

const SalaryRangeList = props => {
  const {list, salaryRangeF} = props
  const onchangeSalaryInput = () => {
    salaryRangeF(list.salaryRangeId)
  }
  return (
    <li className="salaryRangelist-item">
      <input
        type="radio"
        id={list.salaryRangeId}
        value={list.label}
        name="same"
        onChange={onchangeSalaryInput}
      />
      <label className="salaryRangeLabel">{list.label}</label>
    </li>
  )
}

export default SalaryRangeList
