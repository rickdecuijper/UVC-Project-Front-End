// tests/setup-env-mock.js
import { Module } from 'module';

const originalLoad = Module._load;
Module._load = function(request, parent, isMain) {
  if (request.startsWith('$env/')) {return {}};
  return originalLoad(request, parent, isMain);
};
