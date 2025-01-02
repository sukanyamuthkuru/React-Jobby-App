import './index.css'

const SalaryRangeList = props => {
  const {list} = props
  return (
    <li className="salaryRangelist-item">
      <input
        type="radio"
        id={list.salaryRangeId}
        value={list.label}
        name="same"
      />
      <label className="salaryRangeLabel">{list.label}</label>
    </li>
  )
}

export default SalaryRangeList
