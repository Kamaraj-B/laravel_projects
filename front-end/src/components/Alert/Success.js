import React, { Component } from 'react'

export default class Success extends Component
{

    render()
    {
    return(
        <div class="alert alert-success alert-dismissible fade show" style={{width: '22%'}}>
        <button type="button" class="close" data-dismiss="alert">&times;</button>
        <strong>Success!</strong> This alert box could indicate a successful or positive action.
        </div>
    )}
}
