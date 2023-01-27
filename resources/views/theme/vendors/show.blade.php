@extends('theme.default')

@section('content')

<div class="card">
	<div class="card-header">
		<div class="row">
			<div class="col col-md-6"><b>Vendor Details</b></div>
			<div class="col col-md-6">
				<a href="{{ route('vendors.index') }}" class="float-end"><span><i class="fa fa-arrow-circle-left" aria-hidden="true"></i></span></a>
			</div>
		</div>
	</div>
	<div class="card-body">
		<div class="row mb-3">
			<label class="col-sm-2 col-label-form"><b>Name</b></label>
			<div class="col-sm-10">
				{{ $vendor->vendor_name }}
			</div>
		</div>
		<div class="row mb-3">
			<label class="col-sm-2 col-label-form"><b>Email</b></label>
			<div class="col-sm-10">
				{{ $vendor->vendor_email }}
			</div>
		</div>
		<div class="row mb-4">
			<label class="col-sm-2 col-label-form"><b>Type of Vendor</b></label>
			<div class="col-sm-10">
				{{ $vendor->vendor_type }}
			</div>
		</div>
		<div class="row mb-4">
			<label class="col-sm-2 col-label-form"><b>Address</b></label>
			<div class="col-sm-10">
				{{ $vendor->address }}
			</div>
		</div>
		<div class="row mb-4">
			<label class="col-sm-2 col-label-form"><b>Profile/Logo</b></label>
			<div class="col-sm-10">
				<img src="{{ asset('images/' .  $vendor->profile) }}" width="200" class="img-thumbnail" />
			</div>
		</div>
	</div>
</div>

@endsection('content')
