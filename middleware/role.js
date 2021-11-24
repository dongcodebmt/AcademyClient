export default ({ $auth, route, redirect }) => {
  // Get authorizations for matched routes (with children routes too)
  const authorizationLevels = route.meta.map((meta) => {
    if (meta.auth && typeof meta.auth.authority !== 'undefined') {
      return meta.auth.authority;
    }
    return 0;
  })
  // Get highest authorization level
  const highestAuthority = Math.max.apply(null, authorizationLevels);

  let authority = 10;
  if ($auth.hasScope('Banned')) {
    authority = 5;
  }
  if ($auth.hasScope('Students')) {
    authority = 4;
  }
  if ($auth.hasScope('Lecturers')) {
    authority = 3;
  }
  if ($auth.hasScope('Moderators')) {
    authority = 2;
  }
  if ($auth.hasScope('Administrators')) {
    authority = 1;
  }

  if (authority > highestAuthority) {
    return redirect('/');
  }
}