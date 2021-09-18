import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BuildAllBranches } from './buildAllBranches';

class Bootstrap {
  private static app: any;

  static async execute() {
    this.app = await NestFactory.create(AppModule, { cors: true });
    await BuildAllBranches.execute();
    await this.app.listen(3000);
  };
};

Bootstrap.execute();
