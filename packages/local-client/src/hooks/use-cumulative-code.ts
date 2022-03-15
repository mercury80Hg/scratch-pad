import { useTypedSelector } from "./use-typed-selector"

export const useCumulativeCode = (cellId: string) => {
  /* combining the code cells for continuity */
	return useTypedSelector((state) => {
		const { data, order } = state.cells
		const orderedCells = order.map((id) => data[id])

		/* NOTE: keep var, do not change to let/const.  Var can be called
as many times as needed while the others will output an already
declared error */
		/* the underscored is to account for naming conflicts when a 
		user might import React/DOM on their own. */

	const	showFunc = `
		import _React from 'react'
		import _ReactDOM from 'react-dom'
		var show = (value) => {
			const root = document.querySelector('#root')
			if (typeof value === 'object') {
				if (value.$$typeof && value.props) {
					_ReactDOM.render(value, root)
				} else {
					root.innerHTML = JSON.stringify(value)
				}
			} else {
				root.innerHTML = value
			}
		}
		`
		/* a non operation function to reset show() for subsequent preview boxes
on the code cells.   */
		const showFuncNoop = "var show = () => {}"

	const cumulativeCode = []
		for (let c of orderedCells) {
			if (c.type === "code") {
				if(c.id === cellId) {
					cumulativeCode.push(showFunc)
				} else {
					cumulativeCode.push(showFuncNoop)
				}
				cumulativeCode.push(c.content)
			}
			if (c.id === cellId) {
				break
			}
		}
		return cumulativeCode
	}).join('\n')
}