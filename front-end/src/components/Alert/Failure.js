import React, { Component } from 'react'

export default class Failure extends Component
{

    render()
    {
    return(
        <div class="alert alert-danger alert-dismissible fade show" style={{width: '22%'}}>
            <button type="button" class="close" data-dismiss="alert">&times;</button>
            <strong>Danger!</strong> This alert box could indicate a dangerous or potentially negative action.
        </div>
    )}
}
