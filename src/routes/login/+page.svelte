<script lang="ts">
  let mode: 'login' | 'register' = 'login';

  let email = '';
  let username = '';
  let password = '';
  let confirmPassword = '';

  let error = '';
  let loading = false;

  function switchMode() {
    error = '';
    mode = mode === 'login' ? 'register' : 'login';
  }

  async function submit() {
    error = '';

    if (mode === 'register' && password !== confirmPassword) {
      error = 'Passwords do not match';
      return;
    }

    loading = true;

    try {
      //TODO fix endpoints
      const endpoint = mode === 'login'
        ? '/api/auth/login'
        : '/api/auth/register';

      const body: Record<string, string> = { password, email };

      if (mode === 'register') {
        body.username = username;
      }

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message ?? 'Authentication failed');
      }

      alert(mode === 'login' ? 'Logged in!' : 'Registered!');
    } catch (e) {
      error = e instanceof Error ? e.message : 'Something went wrong';
    } finally {
      loading = false;
    }
  }
</script>

<div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-600">
  <div class="w-full max-w-md rounded-2xl bg-gray-900 p-8 shadow-2xl text-gray-100">
    <div class="mb-6 flex rounded-xl bg-gray-800 p-1">
      <button
        type="button"
        on:click={() => (mode = 'login')}
        class="flex-1 rounded-lg py-2 text-sm font-semibold transition"
        class:bg-indigo-600={mode === 'login'}
        class:text-white={mode === 'login'}
        class:text-gray-400={mode !== 'login'}
      >
        Login
      </button>
      <button
        type="button"
        on:click={() => (mode = 'register')}
        class="flex-1 rounded-lg py-2 text-sm font-semibold transition"
        class:bg-indigo-600={mode === 'register'}
        class:text-white={mode === 'register'}
        class:text-gray-400={mode !== 'register'}
      >
        Register
      </button>
    </div>

    <form class="space-y-4" on:submit|preventDefault={submit}>
      <div>
        <label class="block text-sm mb-1">Email</label>
        <input
          type="email"
          bind:value={email}
          required
          class="w-full rounded-lg bg-gray-800 border border-gray-700 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {#if mode === 'register'}
        <div>
          <label class="block text-sm mb-1">Username</label>
          <input
            type="text"
            bind:value={username}
            required
            class="w-full rounded-lg bg-gray-800 border border-gray-700 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      {/if}

      <div>
        <label class="block text-sm mb-1">Password</label>
        <input
          type="password"
          bind:value={password}
          required
          class="w-full rounded-lg bg-gray-800 border border-gray-700 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {#if mode === 'register'}
        <div>
          <label class="block text-sm mb-1">Confirm password</label>
          <input
            type="password"
            bind:value={confirmPassword}
            required
            class="w-full rounded-lg bg-gray-800 border border-gray-700 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      {/if}

      {#if error}
        <p class="text-sm text-red-400 text-center">{error}</p>
      {/if}

      <button
        type="submit"
        disabled={loading}
        class="w-full rounded-xl bg-indigo-600 py-2 font-semibold hover:bg-indigo-500 disabled:opacity-60 disabled:cursor-not-allowed transition"
      >
        {loading
          ? 'Please wait...'
          : mode === 'login'
          ? 'Login'
          : 'Create account'}
      </button>
    </form>

    <button
      class="mt-6 w-full text-sm text-indigo-300 hover:underline"
      on:click={switchMode}
    >
      {mode === 'login'
        ? 'No account yet? Register'
        : 'Already have an account? Login'}
    </button>
  </div>
</div>
