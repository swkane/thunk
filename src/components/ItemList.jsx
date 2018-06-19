import React, { Component } from 'react';
import { connect } from 'react-redux';
import { errorAfterFiveSeconds, itemsFetchData } from '../actions/items';

class ItemList extends Component {
  componentDidMount() {
    this.props.fetchData('http://5826ed963900d612000138bd.mockapi.io/items');
  }

  render() {
        if (this.props.hasErrored) {
            return <p>Sorry! There was an error loading the items</p>;
        }

        if (this.props.isLoading) {
            return <p>Loading…</p>;
        }

        return (
            <React.Fragment>
                <button onClick={this.props.forceError}>Force Error in  5 Seconds</button>
                <ul>
                    {this.props.items.map((item) => (
                        <li key={item.id}>
                            {item.label}
                        </li>
                    ))}
                </ul>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({
    items: state.items,
    hasErrored: state.itemsHasErrored,
    isLoading: state.itemsIsLoading
});

const mapDispatchToProps = dispatch => ({
    fetchData: url => dispatch(itemsFetchData(url)),
    forceError: () => dispatch(errorAfterFiveSeconds())
});

export default connect(mapStateToProps, mapDispatchToProps)(ItemList);
