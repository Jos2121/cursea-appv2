import { execSync } from 'child_process';

try {
  const output = execSync('npm run build', { stdio: 'inherit' });
} catch (error) {
  process.exit(1);
}
