import React from 'react';
import ReactDOM from 'react-dom/client';

let data = [
    {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
    {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
    {category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
    {category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
    {category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
    {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"}
  ];

  class ProductCategoryRow extends React.Component {
    render () {
        let category = this.props.category;
        return (
            <tr>
                <th> {category} </th>
            </tr>
        )
    }
  }

  class ProductRow extends React.Component {

    render () {
        let name = this.props.products.stocked ? this.props.products.name : <span style={{color:'crimson'}}>{this.props.products.name}</span>
        return (
            <tr>
                <td> {name} </td>
                <td> {this.props.products.price} </td>
            </tr>
        )
    }
  }

  class ProductTable extends React.Component {
    render () {
        let rows = [];
        let lastCat = null;
        let filter = this.props.filter;
        let stockOnly = this.props.stockOnly;
        
        this.props.products.forEach( product => {
            if(product.name.indexOf(filter) === -1) return;
            if(!product.stocked && stockOnly) return;
            if (product.category !== lastCat) {
                rows.push (
                    <ProductCategoryRow category = {product.category} key = {product.category} /> 
                )
                lastCat = product.category;
            }
            rows.push (
                <ProductRow products = {product} key = {product.name} />
            )
        })

        return (
            <table>
                <thead>
                    <tr>
                        <th> Name </th>
                        <th> Price </th>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
                
            </table>
        )
    }
  }

  class SearchBar extends React.Component {
    constructor (props) {
        super (props);
        this.handleFilter = this.handleFilter.bind(this);
        this.handleStock = this.handleStock.bind(this);
    }

    handleFilter (e) {
        this.props.onFilterChange (e.target.value);
    }

    handleStock (e) {
        this.props.onStockChange (e.target.checked);
    }

    render () {
        return (
            <form>
                <input type="text" placeholder="search" value={this.props.filter}
                onChange = {this.handleFilter} />
                <input type="checkbox" checked={this.props.stockOnly}
                onChange = {this.handleStock} />
                <span>Only show products in stock</span>
            </form>   
        )
    }
  }

  export default class FilterableTable extends React.Component {
    constructor (props) {
        super (props);
        this.state = {
            filter : 'ball',
            stockOnly: false
        }   
        this.handleFilter = this.handleFilter.bind (this);
        this.handleStock = this.handleStock.bind (this);
    }

    handleFilter (text) {
        this.setState ({
            filter: text
        });
        console.log(this.state.filter);
    }

    handleStock (isChecked) {
        this.setState ({
            stockOnly: isChecked
        });
    }
    render () {
        return (
            <div>
                <SearchBar 
                filter = {this.state.filter} 
                stockOnly = {this.state.stockOnly}
                onFilterChange = {this.handleFilter}
                onStockChange = {this.handleStock} />
                <ProductTable 
                products = {this.props.products} 
                filter = {this.state.filter} 
                stockOnly = {this.state.stockOnly} />
            </div>   
        )
    }
  }

  const root = ReactDOM.createRoot (document.getElementById('root'));
  root.render(<FilterableTable products = {data}/>);
// root.render(<div>Hello</div>);
// reportWebVitals();
