import React, { Component } from 'react';
import Page from '../components/Page';
import PageNotFound from '../components/PageNotFound';
import { connect } from 'react-redux';
import { fetchPageIfNeeded } from '../actions';
import { bindActionCreators } from 'redux';
import Spinner from 'react-spinkit';

@connect (state =>({pages: state.page}), {fetchPageIfNeeded})

// Smart component
export default class PageContainer extends Component {
    componentDidMount() {
        const { fetchPageIfNeeded } = this.props;
        fetchPageIfNeeded(this.props.params.pageName);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.params.pageName != this.props.params.pageName) {
            const { fetchPageIfNeeded } = nextProps;
            fetchPageIfNeeded(nextProps.params.pageName);
        }
    }

    render() {
        const page = this.props.pages[this.props.params.pageName];
        if (!page)
            return (<div></div>);
        else if (page.isFetching)
            return (<Spinner spinnerName='three-bounce' style={{position: 'fixed', top: '50%', left: '40%'}} />);
        else if(page.error)
            return (<PageNotFound />);
        else
            return (<Page page={page}/>);
    }
}
