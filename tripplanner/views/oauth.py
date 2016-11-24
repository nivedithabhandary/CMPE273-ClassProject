from flask import Flask, redirect, url_for, session, current_app,render_template
from flask_oauth import OAuth
from flask import Blueprint
import requests
from urllib2 import Request, urlopen, URLError

oauth = Blueprint('oauth', __name__)

# You must configure these 3 values from Google APIs console
# https://code.google.com/apis/console
GOOGLE_CLIENT_ID = '50089541226-mj2f8be9dltp2htn5nmeek52l97s10j8.apps.googleusercontent.com'
GOOGLE_CLIENT_SECRET = 'j6qS8ruVUghOW3oE4z3Tuhgr'
REDIRECT_URI = '/oauth2callback'  # one of the Redirect URIs from Google APIs console

auth = OAuth()

google = auth.remote_app('google',
                          base_url='https://www.google.com/accounts/',
                          authorize_url='https://accounts.google.com/o/oauth2/auth',
                          request_token_url=None,
                          request_token_params={'scope': 'https://www.googleapis.com/auth/userinfo.email',
                                                'response_type': 'code'},
                          access_token_url='https://accounts.google.com/o/oauth2/token',
                          access_token_method='POST',
                          access_token_params={'grant_type': 'authorization_code'},
                          consumer_key=GOOGLE_CLIENT_ID,
                          consumer_secret=GOOGLE_CLIENT_SECRET)

@oauth.route('/dashboard')
def dashboard():
    print 'User dashboard launched'
    return render_template('userindex.html');

@oauth.route('/index', methods=['GET', 'POST'])
def index():
    access_token = session.get('access_token')
    if access_token is None:
        return redirect(url_for('oauth.login'))

    access_token = access_token[0]
    profile_uri = 'https://www.googleapis.com/oauth2/v1/userinfo'
    headers = {'Authorization': 'OAuth '+access_token}
    req = Request(profile_uri,None, headers)
    try:
        res = urlopen(req)
        r = requests.get(profile_uri, params={'access_token': access_token})
        session['email'] =  r.json()['email']
    except URLError, e:
        if e.code == 401:
            # Unauthorized - bad token
            session.pop('access_token', None)
            return redirect(url_for('oauth.login'))
        return res.read()

    return redirect(url_for('oauth.dashboard'))

@oauth.route('/login')
def login():
    callback=url_for('oauth.authorized', _external=True)
    return google.authorize(callback=callback)

@oauth.route('/logout')
def logout():
# Delete the user's profile and the credentials stored by oauth2.
    del session['email']
    session.modified = True
    return redirect('/')

@oauth.route(REDIRECT_URI)
@google.authorized_handler
def authorized(resp):
    access_token = resp['access_token']
    session['access_token'] = access_token, ''
    return redirect(url_for('oauth.index'))

@google.tokengetter
def get_access_token():
    return session.get('access_token')
