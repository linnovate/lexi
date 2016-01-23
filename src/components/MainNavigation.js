import React, { Component } from 'react';
import { Link } from 'react-router';
import { BlogData } from '../wp-data';

export default class MainNavigation extends Component {
    render() {
        return (
            <div className="blog-masthead">
                <div className="container">
                    <nav className="nav blog-nav">
                        {this.buildMenu()}
                    </nav>
                </div>
            </div>
        );
    }

    buildMenu() {
        if (!BlogData.primaryMenuItems) {
            return <Link to="/" className="nav-link" activeClassName="active" onlyActiveOnIndex={true}>Home</Link>
        } else {
            return BlogData.primaryMenuItems.map((item, key) =>
                    <Link to={item.url} className="nav-link" key={key} activeClassName="active"
                          onlyActiveOnIndex={item.url == '/'}>
                        {item.title}
                    </Link>
            )
        }
    }
}