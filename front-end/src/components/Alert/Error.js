import React, { Component } from 'react'

export default class Error extends Component
{

    render()
    {
    return(
        <div class="alert alert-dark alert-dismissible fade show">
         <button type="button" class="close" data-dismiss="alert">&times;</button>
          <strong>Dark!</strong> Dark grey alert.
        </div>
    )}
}
