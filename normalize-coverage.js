#!/usr/bin/env node
/**
 * Script to normalize LCOV coverage report paths for SonarQube
 * Converts Windows backslashes to forward slashes
 */
const fs = require('fs');
const path = require('path');

const lcovPath = path.join(__dirname, 'coverage', 'lcov.info');

if (!fs.existsSync(lcovPath)) {
    console.warn('⚠️  Coverage file not found:', lcovPath);
    process.exit(0);
}

try {
    let content = fs.readFileSync(lcovPath, 'utf-8');
    
    // Normalize all SF: (source file) paths from backslash to forward slash
    content = content.split('\n').map(line => {
        if (line.startsWith('SF:')) {
            // Remove 'SF:' prefix, normalize path, and add prefix back
            const filePath = line.substring(3);
            const normalized = filePath.replace(/\\/g, '/');
            return 'SF:' + normalized;
        }
        return line;
    }).join('\n');
    
    fs.writeFileSync(lcovPath, content, 'utf-8');
    console.log('✅ Coverage paths normalized successfully');
    
} catch (error) {
    console.error('❌ Error normalizing coverage paths:', error.message);
    process.exit(1);
}

try {
    let content = fs.readFileSync(lcovPath, 'utf-8');

    // Normalize all SF: (source file) paths from backslash to forward slash
    content = content.split('\n').map(line => {
        if (line.startsWith('SF:')) {
            // Remove 'SF:' prefix, normalize path, and add prefix back
            const filePath = line.substring(3);
            const normalized = filePath.replaceAll('\\', '/'); // Usando replaceAll como sugerido
            return 'SF:' + normalized;
        }
        return line;
    }).join('\n');

    fs.writeFileSync(lcovPath, content, 'utf-8');
    console.log('✅ Coverage paths normalized successfully');

} catch (error) {
    console.error('❌ Error normalizing coverage paths:', error.message);
    process.exit(1);
}