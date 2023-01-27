@extends('theme.default')

@section('content')

<div class="card">
	<div class="card-header">
		<div class="row">
			<div class="col col-md-6"><b>Product Details</b></div>
			<div class="col col-md-6">
				<a href="{{ route('products.index') }}" class="float-end"><span><i class="fa fa-arrow-circle-left" aria-hidden="true"></i></span></a>
			</div>
		</div>
	</div>
	<div class="card-body">
		<div class="row mb-3">
			<label class="col-sm-2 col-label-form"><b>Name</b></label>
			<div class="col-sm-10">
				{{ $products->name }}
			</div>
		</div>

		<div class="row mb-4">
			<label class="col-sm-2 col-label-form"><b>Address</b></label>
			<div class="col-sm-10">
				{{ $products->address }}
			</div>
		</div>
		
	</div>
</div>

@endsection('content')
