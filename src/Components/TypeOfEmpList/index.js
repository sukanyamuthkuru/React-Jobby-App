import {Component} from 'react'
import './index.css'

class TypeOfEmpList extends Component {
  onChangeTypeOfEmpList = event => {
    const {inputType, list} = this.props

    inputType(event.target.checked, list.employmentTypeId)
  }

  render() {
    const {list} = this.props

    return (
      <li className="typeofEmplist-item">
        <input
          type="checkbox"
          id={list.employmentTypeId}
          onChange={this.onChangeTypeOfEmpList}
        />
        <label className="typeofemp-label">{list.label}</label>
      </li>
    )
  }
}

export default TypeOfEmpList
