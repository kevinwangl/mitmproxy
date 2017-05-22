import React from 'react'
import renderer from 'react-test-renderer'
import ConnectedHead, { FlowTableHead } from '../../../components/FlowTable/FlowTableHead'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'

const mockStore = configureStore()

describe('FlowTableHead Component', () => {
    let sortFn = jest.fn(),
        flowTableHead = renderer.create(<FlowTableHead setSort={sortFn} sortDesc={true}/>),
        tree =flowTableHead.toJSON()

    it('should render correctly', () => {
        expect(tree).toMatchSnapshot()
    })

    it('should handle click', () => {
        tree.children[0].props.onClick()
        expect(sortFn).toBeCalledWith('TLSColumn', false)
    })

    it('should connect to state', () => {
        let store = mockStore({ flows: {sort: {desc: true, column: 'PathColumn'}} }),
            provider = renderer.create(
                <Provider store={store}>
                    <ConnectedHead/>
                </Provider>),
            tree = provider.toJSON()
        expect(tree).toMatchSnapshot()
    })
})
