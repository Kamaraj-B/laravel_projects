@extends('theme.default')

@section('content')

@if($message = Session::get('success'))

<div class="alert alert-success">
	{{ $message }}
</div>

@endif

<div class="card">
	<div class="card-header">
		<div class="row">
			<div class="col col-md-6"><b>product Data</b></div>
			<div class="col col-md-6">
				<a href="{{ route('products.create') }}" class="float-end"><span><i class="fa fa-user-plus" aria-hidden="true"></i></span></a>
			</div>
		</div>
	</div>
	<div class="card-body">
		<table class="table table-bordered">
			<tr> 
                <th>#Id</th>
				
				<th>Name</th>
				
				<th colspan="3">Action</th>
			</tr>
			@if(count($data) > 0)
               
				@foreach($data as $i => $row)

					<tr>
                    <td>{{ $i+1 }}</td>
				
						<td>{{ $row->name }}</td>
						<td>{{ $row->address }}</td>
                        <td>
							<form method="post" action="{{ route('products.destroy', $row->id) }}">
								@csrf
								@method('DELETE')
								<a href="{{ route('products.show', $row->id) }}" ><span><i class="fa fa-eye" style="color:green;padding:5px;" aria-hidden="true"></i></span></a>
								<a href="{{ route('products.edit', $row->id) }}" ><span><i class="fa fa-edit" style="color:blue;padding:5px;" aria-hidden="true"></i></span></a>
                                <span class="show-alert-delete-box"><i class="fa fa-trash" style="color:red;padding:5px;" aria-hidden="true"></i></span>
							</form>
							
						</td>
					</tr>

				@endforeach

			@else
				<tr>
					<td colspan="5" class="text-center">No Data Found</td>
				</tr>
			@endif
		</table>
		{{-- Pagination --}}
            {!! $data->links() !!}
	</div>
</div>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/sweetalert/2.1.2/sweetalert.min.js"></script>

<script type="text/javascript">
    $('.show-alert-delete-box').click(function(event){
        var form =  $(this).closest("form");
        var name = $(this).data("name");
        event.preventDefault();
        swal({
            title: "Are you sure you want to delete this record?",
            text: "If you delete this, it will be gone forever.",
            icon: "warning",
            type: "warning",
            buttons: ["Cancel","Yes!"],
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((willDelete) => {
            if (willDelete) {
                form.submit();
            }
        });
    });
</script>

@endsection
