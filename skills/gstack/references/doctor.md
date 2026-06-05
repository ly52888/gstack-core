# Doctor

Use `scripts/gstack-doctor.sh` to inspect local readiness.

The doctor should report:

- Skill directory integrity
- Required reference files
- Capability card files
- Node/npm availability
- Git availability
- GitHub CLI availability
- Browser/open command availability
- Optional codegraph script availability

Doctor output is advisory. A missing optional tool should trigger fallback routing, not failure.

