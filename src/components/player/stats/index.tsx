import { SEASON, timeSpanValues } from "../../../constants";
import { useAppSelector } from "../../../lib/hooks";
import { selectTimeSpan } from "../../../lib/timeSpan/slice";
import Card from "../card";
import type PlayerComponent from '../types';

export default function Stats({ 
  loading,
  homeRuns,
  gamesPlayed,
  atBats,
  plateAppearances,
  hits,
  runs,
  rbi,
  avg,
  baseOnBalls,
  doubles,
  triples,
  strikeOuts,
  obp,
  slg,
  ops,
 }: PlayerComponent.Stats.Props) {
  const timeSpan = useAppSelector(selectTimeSpan);
  return (
    <div className='grid grid-cols-2 md:grid-cols-4 w-full gap-4 px-4 pb-4'>
      <span className='text-gray-700 dark:text-gray-400 text-lg'>
        {timeSpan === 'season'
          ? `${SEASON} Season Stats`
          : `${timeSpanValues[timeSpan]} ${SEASON} Stats`}
      </span>
      <Card
        label='Home Runs'
        fillWidth
        isText
        isXL
        loading={loading}
        direction='row'>
        {homeRuns}
      </Card>
      <Card label='Games Played' isText loading={loading}>
        {gamesPlayed}
      </Card>
      <Card label='At Bats' isText loading={loading}>
        {atBats}
      </Card>
      <Card label='Plate Appearances' isText loading={loading}>
        {plateAppearances}
      </Card>
      <Card label='Hits' isText loading={loading}>
        {hits}
      </Card>
      <Card label='Runs' isText loading={loading}>
        {runs}
      </Card>
      <Card label='RBIs' isText loading={loading}>
        {rbi}
      </Card>
      <Card label='Batting Average' isText loading={loading}>
        {avg}
      </Card>
      <Card label='Walks' isText loading={loading}>
        {baseOnBalls}
      </Card>
      <Card label='Doubles' isText loading={loading}>
        {doubles}
      </Card>
      <Card label='Triples' isText loading={loading}>
        {triples}
      </Card>
      <Card label='Strikeouts' isText loading={loading}>
        {strikeOuts}
      </Card>
      <Card label='OBP' isText loading={loading}>
        {obp}
      </Card>
      <Card label='SLG' isText loading={loading}>
        {slg}
      </Card>
      <Card label='OPS' isText loading={loading}>
        {ops}
      </Card>
    </div>
  );
}