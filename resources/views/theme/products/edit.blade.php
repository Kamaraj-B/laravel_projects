@extends('theme.default')

@section('content')

<div class="card">
<div class="card-header">
		<div class="row">
			<div class="col col-md-6"><b>Edit Vendor Details</b></div>
			<div class="col col-md-6">
				<a href="{{ route('vendors.index') }}" class="float-end"><span><i class="fa fa-arrow-circle-left" aria-hidden="true"></i></span></a>
			</div>
		</div>
	<div class="card-body">
		<form method="post" action="{{ route('vendors.update', $vendor->id) }}" enctype="multipart/form-data">
			@csrf
			@method('PUT')
			<div class="row mb-3">
				<label class="col-sm-2 col-label-form">Name</label>
				<div class="col-sm-10">
					<input type="text" name="vendor_name" class="form-control" value="{{ $vendor->vendor_name }}" />
				</div>
			</div>
			<div class="row mb-3">
				<label class="col-sm-2 col-label-form">Email</label>
				<div class="col-sm-10">
					<input type="text" name="vendor_email" class="form-control" value="{{ $vendor->vendor_email }}" />
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
			<div class="row mb-3">
				<label class="col-sm-2 col-label-form">Address</label>
				<div class="col-sm-10">
					<textarea name="address" class="form-control" id="address" cols="15" rows="6">{{ $vendor->address }}</textarea>
				</div>
			</div>
			<div class="row mb-4">
				<label class="col-sm-2 col-label-form">Profile/Logp</label>
				<div class="col-sm-10">
					<input type="file" name="profile" />
					<br />
					<img src="{{ asset('images/' . $vendor->profile) }}" width="100" class="img-thumbnail" />
					<input type="hidden" name="hidden_profile" value="{{ $vendor->profile }}" />
				</div>
			</div>
			<div class="text-center">
				<input type="hidden" name="hidden_id" value="{{ $vendor->id }}" />
				<input type="submit" class="btn btn-primary" value="Edit" />
			</div>	
		</form>
	</div>
</div>
<script>
document.getElementsByName('vendor_type')[0].value = "{{ $vendor->vendor_type }}";
</script>

@endsection('content')
