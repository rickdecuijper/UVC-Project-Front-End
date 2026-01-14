<script lang="ts">
  import { goto } from '$app/navigation';

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
      const endpoint =
        mode === 'login'
          ? 'http://localhost:3011/auth/login'
          : 'http://localhost:3011/auth/register';

      const body: Record<string, string> = {
        email,
        password
      };

      if (mode === 'register') {
        body.username = username;
      }

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message ?? 'Authentication failed');
      }

      /**
       * Store auth token in cookie
       * Cookie name = auth_token
       */
      if (mode === 'login') {
        document.cookie = `auth_token=${data.auth_token}; path=/; max-age=86400`;
        goto('/schatkaart');
      } else {
        goto('/schatkaart');
      }
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
          class="w-full rounded-lg bg-gray-800 border border-gray-700 px-3 py-2"
        />
      </div>

      {#if mode === 'register'}
        <div>
          <label class="block text-sm mb-1">Username</label>
          <input
            type="text"
            bind:value={username}
            required
            class="w-full rounded-lg bg-gray-800 border border-gray-700 px-3 py-2"
          />
        </div>
      {/if}

      <div>
        <label class="block text-sm mb-1">Password</label>
        <input
          type="password"
          bind:value={password}
          required
          class="w-full rounded-lg bg-gray-800 border border-gray-700 px-3 py-2"
        />
      </div>

      {#if mode === 'register'}
        <div>
          <label class="block text-sm mb-1">Confirm password</label>
          <input
            type="password"
            bind:value={confirmPassword}
            required
            class="w-full rounded-lg bg-gray-800 border border-gray-700 px-3 py-2"
          />
        </div>
      {/if}

      {#if error}
        <p class="text-sm text-red-400 text-center">{error}</p>
      {/if}

      <button
        type="submit"
        disabled={loading}
        class="w-full rounded-xl bg-indigo-600 py-2 font-semibold disabled:opacity-60"
      >
        {loading ? 'Please wait...' : mode === 'login' ? 'Login' : 'Create account'}
      </button>
    </form>
  </div>
</div>
