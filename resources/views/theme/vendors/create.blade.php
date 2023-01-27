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
			<div class="col col-md-6"><b>Add Vendor</b></div>
			<div class="col col-md-6">
				<a href="{{ route('vendors.index') }}" class="float-end"><span><i class="fa fa-arrow-circle-left" aria-hidden="true"></i></span></a>
			</div>
		</div>
	</div>
	<div class="card-body" style="padding:90px;">
		<form method="post" action="{{ route('vendors.store') }}" enctype="multipart/form-data">
			@csrf
			<div class="row mb-3">
				<label class="col-sm-2 col-label-form">Name</label>
				<div class="col-sm-10">
					<input type="text" name="vendor_name" class="form-control" />
				</div>
			</div>
			<div class="row mb-3">
				<label class="col-sm-2 col-label-form">Email</label>
				<div class="col-sm-10">
					<input type="text" name="vendor_email" class="form-control" />
				</div>
			</div>
			<div class="row mb-4">
				<label class="col-sm-2 col-label-form">Vendor Type</label>
				<div class="col-sm-10">
					<select name="vendor_type" class="form-control">
						<option value="Manufacturer">Manufacturer</option>
						<option value="Retailer">Retailer</option>
                        <option value="Wholesaler">Wholesaler</option>
					</select>
				</div>
			</div>
			<div class="row mb-4">
				<label class="col-sm-2 col-label-form">Profile/Logo</label>
				<div class="col-sm-10">
					<input type="file" name="profile" />
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
