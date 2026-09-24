import { execSync } from 'child_process';

try {
  const output = execSync('npm run build', { stdio: 'pipe' });
  console.log(output.toString());
} catch (error) {
  console.error(error.stdout.toString());
  console.error(error.stderr.toString());
}
