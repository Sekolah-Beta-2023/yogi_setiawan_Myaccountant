export default function ({ $auth, redirect }) {
    // If the user is not authenticated
    if ($auth.authenticated) {
      return redirect()
    } else {return redirect('/login') }
  }