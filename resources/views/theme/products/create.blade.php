@extends('theme.default')

@section('content')

@if($errors->any())

<div class="alert alert-danger">
	<ul>
	@foreach($errors->all() as $error)

		<li>{{ $error }}</li>

	@endforeach
	</ul>
</div>

@endif

<div class="card">
<div class="card-header">
		<div class="row">
			<div class="col col-md-6"><b>Add Product</b></div>
			<div class="col col-md-6">
				<a href="{{ route('products.index') }}" class="float-end"><span><i class="fa fa-arrow-circle-left" aria-hidden="true"></i></span></a>
			</div>
		</div>
	</div>
	<div class="card-body" style="padding:90px;">
		<form method="post" action="{{ route('products.store') }}" enctype="multipart/form-data">
			@csrf
			<div class="row mb-3">
				<label class="col-sm-2 col-label-form">Name</label>
				<div class="col-sm-10">
					<input type="text" name="product_name" class="form-control" />
				</div>
			</div>
			
			<div class="row mb-3">
				<label class="col-sm-2 col-label-form">Address</label>
				<div class="col-sm-10">
					<textarea name="address" class="form-control" id="address" cols="15" rows="6"></textarea>
				</div>
			</div>
	
			<div class="text-center">
				<input type="submit" class="btn btn-primary" value="Add" />
			</div>	
		</form>
	</div>
</div>

@endsection('content')
