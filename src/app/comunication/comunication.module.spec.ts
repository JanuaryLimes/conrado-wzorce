import { ComunicationModule } from './comunication.module';

describe('ComunicationModule', () => {
  let comunicationModule: ComunicationModule;

  beforeEach(() => {
    comunicationModule = new ComunicationModule();
  });

  it('should create an instance', () => {
    expect(comunicationModule).toBeTruthy();
  });
});
