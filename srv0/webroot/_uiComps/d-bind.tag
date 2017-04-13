<d-bind>

<div each= '{user, key in opts.users}'>
	{key} - {user.name} is {user.age} years old
</div>

</d-bind>