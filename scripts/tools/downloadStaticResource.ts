import downloadCommunityImage from './downloadCommunityImg'
import downloadSponsorImage from './downloadSponsorImg'
import downloadFringeImage from './downloadFringeImg'

async function main () {
  const task = [downloadCommunityImage(), downloadSponsorImage(), downloadFringeImage()]

  return await Promise.all(task)
}

main().then(() => process.exit())
